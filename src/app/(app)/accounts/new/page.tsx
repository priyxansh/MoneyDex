import NewAccountForm from "@/components/accounts/NewAccountForm";

type NewAccountPageProps = {};

const NewAccountPage = ({}: NewAccountPageProps) => {
  return (
    <main className="px-5 py-5">
      <h1 className="text-2xl font-semibold">New Account</h1>
      <NewAccountForm />
    </main>
  );
};

export default NewAccountPage;
