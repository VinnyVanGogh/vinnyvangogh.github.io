# Booking System Configuration

## Calendly Plan Configuration

The booking system automatically adapts based on your Calendly plan type.

### Configuration

In `src/data/booking-options.json`, set the `calendlyPlan` field:

```json
{
  "calendlyPlan": "free", // or "paid"
  "bookingOptions": [...]
}
```

## Behavior

### Free Plan (`"calendlyPlan": "free"`)
- **Schedule a Call** button bypasses the modal
- Directly opens the "General Consultation" Calendly link
- If no Calendly URL is set, falls back to email
- Modal is not rendered (saves bundle size)

### Paid Plan (`"calendlyPlan": "paid"`)
- **Schedule a Call** button opens a modal with all options
- Modal only shows options that have `calendlyUrl` filled in
- Users can select from multiple consultation types
- Full booking experience with descriptions and icons

## Setting Up Calendly URLs

1. **Free Plan**: Only fill in the `calendlyUrl` for "General Consultation"
2. **Paid Plan**: Fill in `calendlyUrl` for all the consultation types you want to offer

## Example

```json
{
  "calendlyPlan": "free",
  "bookingOptions": [
    {
      "id": "general-consultation",
      "calendlyUrl": "https://calendly.com/your-username/general-consultation"
    },
    {
      "id": "technical-interview", 
      "calendlyUrl": "" // Leave empty on free plan
    }
  ]
}
```

## Switching Plans

To upgrade from free to paid:
1. Change `"calendlyPlan": "free"` to `"calendlyPlan": "paid"`
2. Add Calendly URLs to the additional consultation types you want to offer
3. The system will automatically show the modal with all available options