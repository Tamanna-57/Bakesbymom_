// Primitives
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './components/Button/Button';
export { Badge, type BadgeProps } from './components/Badge/Badge';
export { TextField, type TextFieldProps } from './components/Field/TextField';
export { Select, type SelectOption, type SelectProps } from './components/Field/Select';

// Surfaces and decoration
export { Card, type CardProps } from './components/Card/Card';
export {
  PatternSurface,
  PATTERNS,
  type Pattern,
  type PatternSurfaceProps,
} from './components/PatternSurface/PatternSurface';
export { EdgeDivider, EDGE_SHAPES, type EdgeDividerProps, type EdgeShape } from './components/EdgeDivider/EdgeDivider';
export { Doodle, DOODLES, type DoodleName, type DoodleProps } from './components/Doodle/Doodle';
export { Seal, type SealProps } from './components/Seal/Seal';
export { FilterChips, type FilterChipOption, type FilterChipsProps } from './components/FilterChips/FilterChips';
export { Logo, type LogoProps } from './components/Logo/Logo';

// Paper ephemera
export { Ticket, type TicketProps } from './components/Ticket/Ticket';
export { Polaroid, type PolaroidProps } from './components/Polaroid/Polaroid';
export { PriceTag, type PriceTagProps, type PriceTagShape } from './components/PriceTag/PriceTag';
export { PricingCard, type PricingCardProps } from './components/PricingCard/PricingCard';

// Content
export { ProductCard, type ProductCardProps } from './components/ProductCard/ProductCard';
export { ReviewCard, type ReviewCardProps } from './components/ReviewCard/ReviewCard';
export {
  SectionHeading,
  type SectionHeadingProps,
  type SectionHeadingVariant,
} from './components/SectionHeading/SectionHeading';
export { StepList, type Step, type StepListProps, type StepListVariant } from './components/StepList/StepList';
export { Accordion, type AccordionItem, type AccordionProps } from './components/Accordion/Accordion';
export { Marquee, type MarqueeProps } from './components/Marquee/Marquee';
export { Gallery, type GalleryItem, type GalleryProps } from './components/Gallery/Gallery';
export { Orbit, type OrbitImage, type OrbitProps } from './components/Orbit/Orbit';
export { WeekSchedule, type ScheduleDay, type WeekScheduleProps } from './components/WeekSchedule/WeekSchedule';
export {
  NewsletterSignup,
  type NewsletterSignupProps,
  type NewsletterValues,
} from './components/NewsletterSignup/NewsletterSignup';
export { ChatWidget, type ChatMessage, type ChatWidgetProps } from './components/ChatWidget/ChatWidget';

// Page sections
export { SiteHeader, type NavLink, type SiteHeaderProps } from './components/SiteHeader/SiteHeader';
export { Hero, type HeroProps, type HeroVariant } from './components/Hero/Hero';
export {
  SiteFooter,
  type FooterColumn,
  type FooterSocial,
  type SiteFooterProps,
} from './components/SiteFooter/SiteFooter';

// Utilities
export { cx } from './utils/cx';
export { edgeTile, scallopCirclePath, type EdgeTile } from './utils/shapes';
export { TONES, type HeadingLevel, type Tone } from './utils/types';
