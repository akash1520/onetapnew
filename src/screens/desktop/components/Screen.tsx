import { Title } from "components/Title/Title";
import { useTranslation } from "react-i18next";
import { Header } from "../../../components/Header/Header";
import { Overview } from "features/overview";
import { useAdRemoval } from "features/monetization";
import "./styles/Screen.css";
import { PremiumContent } from "./PremiumContent";
import { FreeContent } from "./FreeContent";
import { WINDOW_NAMES } from "app/shared/constants";
import { logOut } from "app/shared/auth.utils";
import { useDesktopHooks } from "./Desktop.hooks";

//avoid the use of static text, use i18n instead, each language has its own text, and the text is stored in the
//locales folder in the project root

const Screen = () => {
  const { t } = useTranslation();
  const { isLoading, isSubscribed } = useAdRemoval();
  
  useDesktopHooks()

  return (
    <div className="desktop">
      <Header WINDOW_NAME={WINDOW_NAMES.DESKTOP}/>
      <button type="button" onClick={logOut}>Log Out</button>
      <div style={{display:"flex", gap:"3rem", flexDirection:"column"}}>
      </div>
      <div className={"desktop__container"}>
        <header className={"desktop__header desktop__fit"}>
          <Title color="white">
            Current Locale: <b>{t("common.language")} 🌐</b>
            <br />
            {t("components.desktop.header")}
          </Title>
        </header>
        <main className={"desktop__main"}>
          <Title color="white">{t("components.desktop.main")}</Title>
          <Overview />
        </main>
        <aside className={"desktop__aside"}>
          <Title color="white">{t("components.desktop.aside")}</Title>
          {isSubscribed || isLoading ? <PremiumContent /> : <FreeContent />}
        </aside>
        <footer className={"desktop__footer desktop__fit"}>
          <Title color="white">{t("components.desktop.footer")}</Title>
        </footer>
      </div>
    </div>
  );
};

export default Screen;
