import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import React from "react"

// Import all story files
import * as CurrencyInputStories from "../CurrencyInput.stories"
import * as ExpandableTextStories from "../ExpandableText.stories"
import * as PasswordInputStories from "../PasswordInput.stories"
import * as QRCodeStories from "../QRCode.stories"
import * as SecretStories from "../Secret.stories"

// Compose stories for testing
const {
  Default: SecretDefault,
  SeedPhrase: SecretSeedPhrase,
  PrivateKey: SecretPrivateKey,
  CustomMaskChar: SecretCustomMaskChar,
  WithoutCopyButton: SecretWithoutCopyButton,
} = composeStories(SecretStories)

const {
  Default: PasswordInputDefault,
  WalletPassword: PasswordInputWalletPassword,
  WithValue: PasswordInputWithValue,
  Disabled: PasswordInputDisabled,
} = composeStories(PasswordInputStories)

const {
  Default: CurrencyInputDefault,
  USD: CurrencyInputUSD,
  EUR: CurrencyInputEUR,
  Bitcoin: CurrencyInputBitcoin,
  WithValue: CurrencyInputWithValue,
  EURWithValue: CurrencyInputEURWithValue,
  BTCWithValue: CurrencyInputBTCWithValue,
  Disabled: CurrencyInputDisabled,
} = composeStories(CurrencyInputStories)

const {
  Default: ExpandableTextDefault,
  BitcoinAddress: ExpandableTextBitcoinAddress,
  LongTransactionId: ExpandableTextLongTransactionId,
  CustomTruncation: ExpandableTextCustomTruncation,
  WithoutCopyButton: ExpandableTextWithoutCopyButton,
  ShortText: ExpandableTextShortText,
  LightningInvoice: ExpandableTextLightningInvoice,
} = composeStories(ExpandableTextStories)

const {
  Default: QRCodeDefault,
  BitcoinAddress: QRCodeBitcoinAddress,
  BitcoinURI: QRCodeBitcoinURI,
  LightningInvoice: QRCodeLightningInvoice,
  SmallSize: QRCodeSmallSize,
  LargeSize: QRCodeLargeSize,
  HighErrorCorrection: QRCodeHighErrorCorrection,
  WebsiteURL: QRCodeWebsiteURL,
} = composeStories(QRCodeStories)

describe("secret Stories", () => {
  it("renders Default story without crashing", () => {
    render(<SecretDefault />)
  })

  it("renders SeedPhrase story without crashing", () => {
    render(<SecretSeedPhrase />)
  })

  it("renders PrivateKey story without crashing", () => {
    render(<SecretPrivateKey />)
  })

  it("renders CustomMaskChar story without crashing", () => {
    render(<SecretCustomMaskChar />)
  })

  it("renders WithoutCopyButton story without crashing", () => {
    render(<SecretWithoutCopyButton />)
  })
})

describe("passwordInput Stories", () => {
  it("renders Default story without crashing", () => {
    render(<PasswordInputDefault />)
  })

  it("renders WalletPassword story without crashing", () => {
    render(<PasswordInputWalletPassword />)
  })

  it("renders WithValue story without crashing", () => {
    render(<PasswordInputWithValue />)
  })

  it("renders Disabled story without crashing", () => {
    render(<PasswordInputDisabled />)
  })
})

describe("currencyInput Stories", () => {
  it("renders Default story without crashing", () => {
    render(<CurrencyInputDefault />)
  })

  it("renders USD story without crashing", () => {
    render(<CurrencyInputUSD />)
  })

  it("renders EUR story without crashing", () => {
    render(<CurrencyInputEUR />)
  })

  it("renders Bitcoin story without crashing", () => {
    render(<CurrencyInputBitcoin />)
  })

  it("renders WithValue story without crashing", () => {
    render(<CurrencyInputWithValue />)
  })

  it("renders EURWithValue story without crashing", () => {
    render(<CurrencyInputEURWithValue />)
  })

  it("renders BTCWithValue story without crashing", () => {
    render(<CurrencyInputBTCWithValue />)
  })

  it("renders Disabled story without crashing", () => {
    render(<CurrencyInputDisabled />)
  })
})

describe("expandableText Stories", () => {
  it("renders Default story without crashing", () => {
    render(<ExpandableTextDefault />)
  })

  it("renders BitcoinAddress story without crashing", () => {
    render(<ExpandableTextBitcoinAddress />)
  })

  it("renders LongTransactionId story without crashing", () => {
    render(<ExpandableTextLongTransactionId />)
  })

  it("renders CustomTruncation story without crashing", () => {
    render(<ExpandableTextCustomTruncation />)
  })

  it("renders WithoutCopyButton story without crashing", () => {
    render(<ExpandableTextWithoutCopyButton />)
  })

  it("renders ShortText story without crashing", () => {
    render(<ExpandableTextShortText />)
  })

  it("renders LightningInvoice story without crashing", () => {
    render(<ExpandableTextLightningInvoice />)
  })
})

describe("qRCode Stories", () => {
  it("renders Default story without crashing", () => {
    render(<QRCodeDefault />)
  })

  it("renders BitcoinAddress story without crashing", () => {
    render(<QRCodeBitcoinAddress />)
  })

  it("renders BitcoinURI story without crashing", () => {
    render(<QRCodeBitcoinURI />)
  })

  it("renders LightningInvoice story without crashing", () => {
    render(<QRCodeLightningInvoice />)
  })

  it("renders SmallSize story without crashing", () => {
    render(<QRCodeSmallSize />)
  })

  it("renders LargeSize story without crashing", () => {
    render(<QRCodeLargeSize />)
  })

  it("renders HighErrorCorrection story without crashing", () => {
    render(<QRCodeHighErrorCorrection />)
  })

  it("renders WebsiteURL story without crashing", () => {
    render(<QRCodeWebsiteURL />)
  })
})
