import Image from "next/image";

type ThumbnailProps = {
  thumbnail: string | null | undefined;
};

const Thumbnail = ({ thumbnail }: ThumbnailProps) => {
  return (
    <div className="flex items-center">
      <Image
        alt="Card background"
        className="object-fill rounded-xl"
        src={thumbnail || ""}
        width={500}
        height={500}
      />
    </div>
  );
};

export default Thumbnail;
