import { AccountBalance, CompareArrows, CurrencyExchange, Group, Groups, GroupsRounded, LockOpen, Telegram } from "@mui/icons-material"
import { supportURL } from "../utils/url"
export const listItemData = [
  {
    icon: AccountBalance,
    text: "Bind Bank",
    route: "bindBank",
  },
  {
    icon: CompareArrows,
    text: "Money Record",
    route: "record",
  },
  {
    icon: CurrencyExchange,
    text: "My Invest",
    route: "myPlans",
  },

  {
    icon: GroupsRounded,
    text: "Invite",
    route: "invite",
  },

  {
    icon: LockOpen,
    text: "Set New Password",
    route: "newPassword",
  },
  {
    icon: Telegram,
    text: "Telegram Support",
    route: "support",
  },
]
