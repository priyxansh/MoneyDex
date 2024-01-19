import NewAccountForm from "@/components/accounts/NewAccountForm";

type NewAccountPageProps = {};

const NewAccountPage = ({}: NewAccountPageProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New Account</h1>
      <NewAccountForm />
    </div>
  );
};

export default NewAccountPage;
