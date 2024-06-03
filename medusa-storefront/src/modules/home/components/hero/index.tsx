import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <Image src="/images/medusa-hero.png" fill alt="hero" />
    </div>
  );
};

export default Hero;
