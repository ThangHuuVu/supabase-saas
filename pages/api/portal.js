import { supabase } from "../../utils/supabase";
import cookie from "cookie";
import initStripe from "stripe";

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const token = cookie.parse(req.headers.cookie)["sb:token"];

  // Assign access_token for RLS
  supabase.auth.session = () => ({
    access_token: token,
  });

  const {
    data: { stripe_customer },
  } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: "http://localhost:3000/dashboard",
  });

  res.send({
    url: session.url,
  });
};

/**
 * Let users manage subscriptions on Stripe portal. Similar to [priceId].js API
 * - Get the user's stripe customer id from supabase
 * - Open a Stripe portal session 
 */
export default handler;