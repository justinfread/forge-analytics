import Card from "../components/ui/Card/Card";
import PageHeader from "../components/ui/PageHeader/PageHeader";

function Dashboard() {
  return (
    <section>
      <PageHeader classname="styles.header"
        title="Dashboard"
        subtitle="Monitor Web3 payment adoption, whale activity, and stablecoin movement."
      />

      <Card>
        <h3>Forge Analytics is online.</h3>
        <p>This dashboard shell is ready for data modules.</p>
      </Card>
    </section>
  );
}

export default Dashboard;