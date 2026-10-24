import { useState } from 'react';
import { PatternSurface, SectionHeading, Select, TextField } from '@bakesbymom/ui';
import { art, treatArt } from '../content';
import { whatsappLink } from '../content/bakery';
import { boxes, treatOrderMessage } from '../content/order';
import type { Treat, TreatCategory } from '../content/treats';
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

/** One treat (the old site's /shop/<type>/<item>): what it is, and an order that opens in WhatsApp. */
export function TreatPage({ category, treat }: { category: TreatCategory; treat: Treat }) {
  const image = treatArt[category.slug] ?? { src: art.cupcake, alt: '' };
  const step = category.unit === 'grams' ? 50 : 1;
  const [quantity, setQuantity] = useState(category.minQty);
  const [choice, setChoice] = useState(category.choices?.[0] ?? '');
  const [extras, setExtras] = useState<string[]>([]);
  const [when, setWhen] = useState<WhenWhere>({ date: '', slot: '', fulfilment: { method: 'Pickup' } });
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const order = treatOrderMessage(category, treat, { quantity, choice, extras, ...when, name, notes });
  const others = category.items.filter((item) => item.slug !== treat.slug);

  return (
    <Layout path="/shop">
      <section className="site-section">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Treats', href: '/shop' },
              { label: category.name, href: `/shop/${category.slug}` },
              { label: treat.name },
            ]}
          />
          <div className="shop-item">
            <div className="shop-item__media">
              <PatternSurface pattern="gingham" tone="pink" className="shop-item__photo shop-item__photo--art">
                <img src={image.src} alt={image.alt} width={400} height={400} />
              </PatternSurface>
              <p className="order-hint">An illustration for now; our own photo is coming soon.</p>
            </div>

            <div className="shop-item__info">
              <SectionHeading
                level={1}
                size="lg"
                eyebrow={category.name}
                title={treat.name}
                description={treat.description}
              />
              <EgglessNote />
              <ul className="shop-know">
                {treat.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <form
                className="order-form"
                onSubmit={(event) => event.preventDefault()}
                aria-label={`Order ${treat.name}`}
              >
                <OrderGroup title="Your order">
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

      {others.length > 0 && (
        <section className="site-section site-section--beige">
          <div className="site-container">
            <SectionHeading title={`More ${category.name.toLowerCase()}`} size="md" />
            <ul className="shop-more">
              {others.map((other) => (
                <li key={other.slug}>
                  <a className="shop-more__link" href={`/shop/${category.slug}/${other.slug}`}>
                    <strong>{other.name}</strong>
                    <span>{other.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Layout>
  );
}
