import { MultilingualQuote } from "../../ui/MultilingualQuote";

const sampleQuotes = [
  {
    id: "en",
    label: "EN",
    text: "It always seems impossible until it’s done.",
  },
  {
    id: "hi",
    label: "HI",
    text: "जब तक काम पूरा नहीं हो जाता, तब तक वह हमेशा असंभव लगता है।",
  },
  {
    id: "ja",
    label: "JA",
    text: "成し遂げるまでは、いつも不可能に思える。",
  },
  {
    id: "es",
    label: "ES",
    text: "Siempre parece imposible hasta que se hace.",
  },
];

export default function MultilingualQuotePreview() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <MultilingualQuote
        quotes={sampleQuotes}
        defaultLanguage="en"
        authorName="Nelson Mandela"
      />
    </div>
  );
}
