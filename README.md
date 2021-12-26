# Code for Egghead Course: Build a SaaS product with Next.js, Supabase and Stripe


## Egghead Course
https://egghead.io/courses/build-a-saas-product-with-next-js-supabase-and-stripe-61f2bc20

## Setups

### Supabase
- Create new Supabase project
- Create tables
  -  `profile`: Extension of `user` (Supabase Auth predefined table)
  -  `lesson`: Or product. Publicly available
  -  `premium_content`: Extension of `lesson`. Contains `video_url` which is available for subscribled user only.

#### RLS Policies
<img width="918" alt="Screen Shot 2021-12-26 at 13 57 54" src="https://user-images.githubusercontent.com/31528554/147401282-ceed3aeb-6add-42b7-8ef0-edc73bef0f62.png">

#### Functions & Trigger
- Trigger: `create_new_profile_for_user`
- Function: `create_profile_for_user`
```
begin
  insert into public.profile(id, email)
  values(new.id, new.email);

  return new;
end;
```

### Function hooks
- `get_stripe_customer`: Create Stripe customer and update in profile.


### Stripe

#### Web hook
Create a webhook for events: `customer.subscription.deleted` and `customer.subscription.updated`. Call Next.js API `/api/stripe-hooks` to update profile table.

#### Products
Create products & query them in Next.js application


#### Portal
https://dashboard.stripe.com/test/settings/billing/portal. Setup terms, privacy & default callback URL
