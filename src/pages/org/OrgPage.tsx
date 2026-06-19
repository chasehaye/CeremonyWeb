import { useParams } from 'react-router-dom';

export default function OrgPage() {
  const { slug } = useParams();

  return <div className="text-muted">org page — {slug}</div>;
}