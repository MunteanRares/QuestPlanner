import useGetProfile from "../../hooks/useGetProfile";

const ProfilePage = () => {
  const { data } = useGetProfile();

  return <div>Welcome, {data?.username}</div>;
};

export default ProfilePage;
