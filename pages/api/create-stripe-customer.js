import initStripe from "stripe";
import { getServiceSupabase } from "../../utils/supabase";

const handler = async (req, res) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  // Bypass RLS
  const supabase = getServiceSupabase();

  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);

  res.send({ message: `stripe customer created: ${customer.id}` });
};

/**
 * Supabase Function hook API. Called when a user signs up.
 * - Create a Stripe customer on Stripe
 * - Update stripe_customer in profile table
 */
export default handler;