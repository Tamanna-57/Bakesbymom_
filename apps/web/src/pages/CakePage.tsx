import { useState } from 'react';
import { Card, PatternSurface, SectionHeading, Select, TextField } from '@bakesbymom/ui';
import { cakeAddons, cakeFlavours, cakeSizes, giftAddons, inr, kgLabel, whatsappLink } from '../content/bakery';
import { findOccasion, type Cake } from '../content/catalog';
import { cakeOrderMessage, cakePrice } from '../content/order';
import { CakeCard } from '../sections/blocks';
import { Layout } from './Layout';
import { Breadcrumbs, Chips, EgglessNote, OrderGroup, WhatsAppOrder, WhenWhereFields, type WhenWhere } from './order';

/** One cake (the old site's /catalog/<cake>): photos, price, and an order that opens in WhatsApp. */
export function CakePage({ cake }: { cake: Cake }) {
  const occasion = findOccasion(cake.occasion);
  const [photo, setPhoto] = useState(0);
  const [weightKg, setWeightKg] = useState(cake.weightKg);
  const [flavour, setFlavour] = useState('');
  const [addons, setAddons] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [when, setWhen] = useState<WhenWhere>({ date: '', slot: '', fulfilment: { method: 'Pickup' } });
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const price = cakePrice(cake, weightKg);
  const order = cakeOrderMessage(cake, occasion?.name ?? '', {
    weightKg,
    flavour,
    addons,
    message,
    ...when,
    name,
    notes,
  });
  const current = cake.photos[photo] ?? cake.photos[0];
  const more = (occasion?.cakes ?? []).filter((other) => other.slug !== cake.slug);

  return (
    <Layout path="/catalog">
      <section className="site-section">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cakes', href: '/catalog' },
              ...(occasion ? [{ label: occasion.name, href: `/catalog?occasion=${occasion.slug}` }] : []),
              { label: cake.name },
            ]}
          />
          <div className="shop-item">
            <div className="shop-item__media">
              <PatternSurface pattern="dots" tone="pink" ground="var(--bbm-color-bg-pink)" className="shop-item__photo">
                {current && (
                  <img
                    src={current.src}
                    width={current.width}
                    height={current.height}
                    alt={`${cake.name}: ${cake.description}`}
                  />
                )}
              </PatternSurface>
              {cake.photos.length > 1 && (
                <div className="shop-item__thumbs" role="group" aria-label="Photos">
                  {cake.photos.map((p, i) => (
                    <button
                      key={p.src}
                      type="button"
                      aria-pressed={i === photo}
                      aria-label={`Photo ${i + 1} of ${cake.photos.length}`}
                      onClick={() => setPhoto(i)}
                    >
                      <img src={p.src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="shop-item__info">
              <SectionHeading
                level={1}
                size="lg"
                eyebrow={occasion?.name}
                title={cake.name}
                description={cake.description}
              />
              <EgglessNote />
              <dl className="shop-facts">
                <div>
                  <dt>Per pound</dt>
                  <dd>{inr(cake.perPound)}</dd>
                </div>
                <div>
                  <dt>Listed weight</dt>
                  <dd>{kgLabel(cake.weightKg)}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{inr(cake.price)}</dd>
                </div>
              </dl>

              <form
                className="order-form"
                onSubmit={(event) => event.preventDefault()}
                aria-label={`Order ${cake.name}`}
              >
                <OrderGroup title="Your cake">
                  <div className="order-row">
                    <Select
                      label="Size"
                      value={String(weightKg)}
                      onChange={(event) => setWeightKg(Number(event.target.value))}
                      options={cakeSizes.map((size) => ({
                        value: String(size.kg),
                        label: size.label,
                      }))}
                      hint={[
                        weightKg === cake.weightKg ? 'As pictured' : '',
                        cakeSizes.find((size) => size.kg === weightKg)?.serves ?? '',
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    />
                    <Select
                      label="Flavour"
                      value={flavour}
                      onChange={(event) => setFlavour(event.target.value)}
                      options={[
                        { value: '', label: 'Ask Mom to suggest' },
                        ...cakeFlavours.map((f) => ({ value: f, label: f })),
                      ]}
                    />
                  </div>
                  <Chips
                    label="Make it yours"
                    multiple
                    options={[...cakeAddons, ...giftAddons]}
                    value={addons}
                    onChange={setAddons}
                  />
                  <TextField
                    label="Message on the cake"
                    optional
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Happy birthday Maa"
                  />
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
                    hint="Colours, a reference photo you'll send, allergies…"
                  />
                </OrderGroup>

                <Card tone="butter" outline padding="md" className="order-total" aria-live="polite">
                  <span>{price.exact ? 'Price' : 'About'}</span>
                  <strong>{inr(price.amount)}</strong>
                  <span className="order-hint">
                    {price.exact
                      ? `For ${kgLabel(weightKg)}, as listed. Add-ons and flavour may change it; Mom confirms on WhatsApp.`
                      : `${kgLabel(weightKg)} at ${inr(cake.perPound)} a pound. Mom confirms the final price on WhatsApp.`}
                  </span>
                </Card>

                <WhatsAppOrder href={whatsappLink(order)} />
              </form>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="site-section site-section--beige">
          <div className="site-container">
            <SectionHeading title={`More for ${occasion?.name ?? 'this occasion'}`} size="md" />
            <ul className="site-menu__grid">
              {more.map((other, i) => (
                <li key={other.slug}>
                  <CakeCard cake={other} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Layout>
  );
}
