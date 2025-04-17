import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Loading from "../components/loading";
import "../public/webfonts/flaticon.css";
import { wrapper } from "../redux/store";
import "../style/all.min.css";
import "../style/style.css";
import "../style/rtl.css";
import "../style/custom.css";
import 'swiper/scss';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
const MyApp = ({ Component, ...rest }) => {
  const router = useRouter();
  const [translateData, setTranslateData] = useState();
  const [lang, setLang] = useState();
  const [adSense, setAdSense] = useState();
  const [enableAdSense, setEnableAdSense] = useState(0);

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    setTranslateData(JSON.parse(localStorage.getItem("langData")));
    setLang(localStorage.getItem("lang"));


    const handleRouteChangeStart = (url) => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = (url) => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  i18next
    .use(initReactI18next)
    .init({
      lng: lang,
      resources: {
        [lang]: {
          translation: translateData
        }
      }
    })
  i18next.reloadResources([lang]);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

      </Head>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <Component {...props.pageProps} />
      <ToastContainer position="top-left" autoClose={2000} />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
