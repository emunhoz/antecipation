import "./styles/global.css"
import HomePage from './pages/home'

import BaseCard from "./components/base-card";
import BaseInput from "./components/base-input";
import ListPreviewValues from "./components/list-preview-values";
import LoadingEl from "./components/loading-el";

// Pages
customElements.define("home-page", HomePage);

// Components
customElements.define("base-card", BaseCard);
customElements.define("base-input", BaseInput);
customElements.define("list-preview-values", ListPreviewValues);
customElements.define("loading-el", LoadingEl);
