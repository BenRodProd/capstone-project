import useSWR from "swr";
const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};
export default function FetchUser() {
  const { data } = useSWR("/api/users", fetcher);

  return data;
}
