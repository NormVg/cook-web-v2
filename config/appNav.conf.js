import {
  Text,
  LayoutPanelTop,
  SquareDashedBottomCode,
  Key,
  Bolt,
  Telescope,
  MessageSquareText,BookText

} from "lucide-vue-next";

const appNav = [
  {
    name: "Template",
    link: "/app/template",
    icon: LayoutPanelTop,
  },
  {
    name: "Snippets",
    link: "/app/snippets",
    icon: SquareDashedBottomCode,
  },
  {
    name: "API Keys",
    link: "/app/api",
    icon: Key,
  },
  {
    name: "Prompts",
    link: "/app/prompts",
    icon: Text,
  },
  {
    name: "Settings",
    link: "/app/settings",
    icon: Bolt,
  },

  {
    name: "Feedback",
    link: "/feedback",
    icon: MessageSquareText,
  },

  {
    name: "Explore",
    link: "/explore",
    icon: Telescope,
  },
  {
    name: "Docs",
    link: "https://docs.taohq.org/docs/Cook/cook-intro",
    icon: BookText,
  },
];


export {appNav}
