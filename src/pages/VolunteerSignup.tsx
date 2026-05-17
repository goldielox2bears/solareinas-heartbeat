import { VolunteerSignupForm } from '@/components/VolunteerSignupForm';
import SEO from '@/components/SEO';

const VolunteerSignup = () => {
  return (
    <>
      <SEO
        title="Join the Free Herd — Volunteer at Solareinas Ranch"
        description="Apply to volunteer at our Sierra Nevada ranch sanctuary. Join the Free Herd and help care for rescued animals and regenerative land."
        path="/volunteer-signup"
      />
      <VolunteerSignupForm />
    </>
  );
};

export default VolunteerSignup;
