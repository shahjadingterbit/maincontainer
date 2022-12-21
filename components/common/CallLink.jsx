import Link from "next/link";

const CallLink = ({ data, className }) => {
  return (
    <Link className={`text-4xl text-primary font-medium ${className}`} href={`tel:${data.phone}`}>
      {data.phone}
    </Link>
  );
};

export default CallLink;