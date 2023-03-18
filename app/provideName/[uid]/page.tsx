import ProvideNameComponent from "../ProvideNameComponent";
export default async function ProvideName({ params: { uid } }) {
  return <ProvideNameComponent uid={uid} />;
}
