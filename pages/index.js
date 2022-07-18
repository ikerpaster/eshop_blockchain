import Main from "../components/Main";
import TopHeader from "../components/TopHeader";
const styles = {
  container: `h-full w-full flex bg-[#fff]`,
};

export default function Home() {
  return (
    <>
      <TopHeader />

      <div className={styles.container}>
        <Main />
      </div>
    </>
  );
}
