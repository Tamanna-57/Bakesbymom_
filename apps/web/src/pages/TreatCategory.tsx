import { useState } from 'react';
import { Button, Card, PatternSurface, SectionHeading, Select, TextField } from '@bakesbymom/ui';
import { stock, treatArt } from '../content';
import { whatsappLink } from '../content/bakery';
import { boxes, treatOrderMessage } from '../content/order';
import { treatCategories, type TreatCategory } from '../content/treats';
import { replaceUrl } from '../router';
import { SectionEdge } from '../sections/blocks';
import { Layout } from './Layout';
import {
  Breadcrumbs,
  Chips,
  EgglessNote,
  OrderGroup,
  QuantityStepper,
  WhatsAppOrder,
  WhenWhereFields,
  type WhenWhere,
} from './order';

/**
 * One kind of treat and its order, on one page (/shop/<type>). The old item pages (/shop/<type>/<item>) open
 * this same page with that flavour picked; picking another keeps the address in step, so it can be shared.
 */
export function TreatCategoryPage({ category, initialItem }: { category: TreatCategory; initialItem?: string }) {
  const image = treatArt[category.slug] ?? stock.cupcakes;
  const step = category.unit === 'grams' ? 50 : 1;
  const [itemSlug, setItemSlug] = useState(
    category.items.some((item) => item.slug === initialItem) ? initialItem! : category.items[0]!.slug,
  );
  const [quantity, setQuantity] = useState(category.minQty);
  const [choice, setChoice] = useState(category.choices?.[0] ?? '');
  const [extras, setExtras] = useState<string[]>([]);
  const [when, setWhen] = useState<WhenWhere>({ date: '', slot: '', fulfilment: { method: 'Pickup' } });
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const treat = category.items.find((item) => item.slug === itemSlug) ?? category.items[0]!;
  const order = treatOrderMessage(category, treat, { quantity, choice, extras, ...when, name, notes });

  const pick = (next: string[]) => {
    const found = category.items.find((item) => item.name === next[0]);
    if (!found) return;
    setItemSlug(found.slug);
    replaceUrl(`/shop/${category.slug}/${found.slug}`);
  };

  return (
    <Layout path="/shop">
      <section className="site-section site-section--blue">
        <div className="site-container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Menu', href: '/menu#treats' }, { label: category.name }]}
          />
          <div className="shop-item">
            <div className="shop-item__media">
              <PatternSurface pattern="gingham" tone="pink" className="shop-item__photo shop-item__photo--art">
                <img src={image.src} alt={image.alt} width={400} height={400} />
                <p className="shop-photo-note">Photo for reference. Every box is baked to order.</p>
              </PatternSurface>
              <Card tone="blue" outline padding="md">
                <p className="bbm-text-eyebrow">Good to know</p>
                <ul className="shop-know">
                  <li>
                    Smallest order: {category.minQty} {category.unit}
                  </li>
                  {category.perBox && (
                    <li>
                      One box holds {category.perBox} {category.unit}
                    </li>
                  )}
                  {/* The eggless note above already says so */}
                  {treat.details
                    .filter((detail) => !/eggless/i.test(detail))
                    .map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                </ul>
              </Card>
            </div>

            <div className="shop-item__info">
              <SectionHeading level={1} size="lg" title={category.name} description={category.blurb} />
              <EgglessNote />

              <form
                className="order-form"
                onSubmit={(event) => event.preventDefault()}
                aria-label={`Order ${category.name.toLowerCase()}`}
              >
                <OrderGroup title="Your order">
                  <Chips
                    label="Flavour"
                    options={category.items.map((item) => item.name)}
                    value={[treat.name]}
                    onChange={pick}
                  />
                  <p className="order-hint treat-description" aria-live="polite">
                    <strong>{treat.name}.</strong> {treat.description}
                  </p>
                  {category.choices && (
                    <Select
                      label={category.choiceLabel ?? 'Choice'}
                      value={choice}
                      onChange={(event) => setChoice(event.target.value)}
                      options={category.choices.map((c) => ({ value: c, label: c }))}
                    />
                  )}
                  <QuantityStepper
                    label={`How many? (${category.unit}, smallest order ${category.minQty})`}
                    hint={
                      category.perBox && quantity >= category.minQty
                        ? `That's ${boxes(quantity, category.perBox)}. Order any number from ${category.minQty} upwards; we'll box it sensibly.`
                        : `Order any amount from ${category.minQty} ${category.unit} upwards.`
                    }
                    value={quantity}
                    min={category.minQty}
                    step={step}
                    unit={category.unit}
                    onChange={setQuantity}
                  />
                  <Chips label="Make it yours" multiple options={category.extras} value={extras} onChange={setExtras} />
                </OrderGroup>

                <WhenWhereFields value={when} onChange={setWhen} />

                <OrderGroup title="Anything else">
                  <TextField
                    label="Your name"
                    optional
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label="Notes"
                    optional
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    hint={
                      category.slug === 'brownies'
                        ? 'For a mixed box, tell us the split.'
                        : 'Allergies, a flavour you want, a note for the box…'
                    }
                  />
                </OrderGroup>

                <p className="order-hint">Price confirmed on WhatsApp: every box is baked to order.</p>
                <WhatsAppOrder href={whatsappLink(order)} />
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section--pink site-section--edged">
        <SectionEdge color="var(--bbm-color-bg-pink)" />
        <div className="site-container">
          <SectionHeading title="More from the kitchen" size="md" align="center" />
          <div className="shop-more">
            <Button variant="secondary" href="/menu">
              Cakes
            </Button>
            {treatCategories
              .filter((other) => other.slug !== category.slug)
              .map((other) => (
                <Button key={other.slug} variant="secondary" href={`/shop/${other.slug}`}>
                  {other.name}
                </Button>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
