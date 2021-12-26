import { supabase } from "../../utils/supabase";

const handler = async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
};

/**
 * Set the auth cookie for the user. Called when user signin / sign out.
 */
export default handler;