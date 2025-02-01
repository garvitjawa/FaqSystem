import translate from "google-translate-api-x";

translate;

const translateText = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Translation failed: `, error);
    return text;
  }
};
export default translateText;
