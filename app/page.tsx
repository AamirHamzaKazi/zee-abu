import dynamic from "next/dynamic";

const Intro = dynamic(() => import("./components/Intro"));
const Nikkah = dynamic(() => import("./components/Nikkah"));
const WeddingEvents = dynamic(() => import("./components/WeddingEvents"));
const Umrah = dynamic(() => import("./components/Umrah"));
const Return = dynamic(() => import("./components/Return"));
const Ajmer = dynamic(() => import("./components/Ajmer"));
const Distance = dynamic(() => import("./components/Distance"));
const Anniversary = dynamic(() => import("./components/Anniversary"));
const Message = dynamic(() => import("./components/Message"));
const Final = dynamic(() => import("./components/Final"));

export default function Home() {
  return (
    <main>
      <Intro />
      <Nikkah />
      <WeddingEvents />
      <Umrah />
      <Return />
      <Ajmer />
      <Anniversary />
      <Distance />
      <Message />
      <Final />
    </main>
  );
}
