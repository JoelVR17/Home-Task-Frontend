import ProfileForm from "@/components/profle/ProfileForm";
import Loader from "@/components/Utils/Loader";
import { useAuth } from "@/hooks/useAuth";

const ProfileView = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (data) return <ProfileForm data={data} />;
};

export default ProfileView;
