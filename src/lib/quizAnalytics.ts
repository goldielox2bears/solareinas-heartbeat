type QuizEventName =
  | "quiz_started"
  | "quiz_question_answered"
  | "quiz_completed"
  | "quiz_result_viewed"
  | "quiz_share_clicked"
  | "quiz_newsletter_signup"
  | "quiz_sponsorship_cta_clicked";

type QuizEventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
    dataLayer?: any[];
  }
}

export const trackQuizEvent = (event: QuizEventName, props: QuizEventProps = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, props);
  }
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, { props });
  }
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...props,
    });
  }
  if (import.meta.env.DEV) {
    console.log("[Quiz Analytics]", event, props);
  }
};

export const saveQuizCompletion = async (data: {
  primary_result: string;
  secondary_result: string;
  is_blended: boolean;
  answers: Record<number, number>;
}) => {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("quiz_completions").insert({
      primary_result: data.primary_result,
      secondary_result: data.secondary_result,
      is_blended: data.is_blended,
      answers: data.answers,
    });
    if (error) {
      console.error("[Quiz Analytics] Failed to save completion:", error);
    }
  } catch (err) {
    console.error("[Quiz Analytics] Failed to save completion:", err);
  }
};
