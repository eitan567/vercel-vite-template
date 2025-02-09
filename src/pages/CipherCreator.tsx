/// <reference lib="dom" />
import React, { useState } from 'react';
import { Scroll, Key, Sword, Castle, Skull, Languages, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom'
import { X } from 'lucide-react';

type CipherType = 'ancient' | 'hieroglyphs' | 'runes' | 'symbols' | 'magic';
type LanguageType = 'he' | 'en';

interface CipherMap {
  [key: string]: string;
}

type CipherSet = Record<CipherType, CipherMap>;

interface CipherStyle {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  bgColor: string;
}

type CipherStyles = Record<CipherType, CipherStyle>;

const CipherCreator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [selectedCipher, setSelectedCipher] = useState<CipherType>('ancient');
  const [language, setLanguage] = useState<LanguageType>('he');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const hebrewCiphers: CipherSet = {
    ancient: {
      'א': '𐤀', 'ב': '𐤁', 'ג': '𐤂', 'ד': '𐤃', 'ה': '𐤄', 'ו': '𐤅', 'ז': '𐤆', 'ח': '𐤇', 'ט': '𐤈',
      'י': '𐤉', 'כ': '𐤊', 'ל': '𐤋', 'מ': '𐤌', 'נ': '𐤍', 'ס': '𐤎', 'ע': '𐤏', 'פ': '𐤐',
      'צ': '𐤑', 'ק': '𐤒', 'ר': '𐤓', 'ש': '𐤔', 'ת': '𐤕',
      'ך': '𐤊', 'ם': '𐤌', 'ן': '𐤍', 'ף': '𐤐', 'ץ': '𐤑',
      '0': '𐤧', '1': '𐤨', '2': '𐤩', '3': '𐤪', '4': '𐤫',
      '5': '𐤬', '6': '𐤭', '7': '𐤮', '8': '𐤯', '9': '𐤰'
    },
    hieroglyphs: {
      'א': '𓃾', 'ב': '𓃿', 'ג': '𓄀', 'ד': '𓄁', 'ה': '𓄂', 'ו': '𓄃', 'ז': '𓄄', 'ח': '𓄅', 'ט': '𓄆',
      'י': '𓄇', 'כ': '𓄈', 'ל': '𓄉', 'מ': '𓄊', 'נ': '𓄋', 'ס': '𓄌', 'ע': '𓄍', 'פ': '𓄎',
      'צ': '𓄏', 'ק': '𓄐', 'ר': '𓄑', 'ש': '𓄒', 'ת': '𓄓',
      'ך': '𓄔', 'ם': '𓄕', 'ן': '𓄖', 'ף': '𓄗', 'ץ': '𓄘',
      '0': '𓅐', '1': '𓅑', '2': '𓅒', '3': '𓅓', '4': '𓅔',
      '5': '𓅕', '6': '𓅖', '7': '𓅗', '8': '𓅘', '9': '𓅙'
    },
    runes: {
      'א': 'ᚠ', 'ב': 'ᚡ', 'ג': 'ᚢ', 'ד': 'ᚣ', 'ה': 'ᚤ', 'ו': 'ᚥ', 'ז': 'ᚦ', 'ח': 'ᚧ', 'ט': 'ᚨ',
      'י': 'ᚩ', 'כ': 'ᚪ', 'ל': 'ᚫ', 'מ': 'ᚬ', 'נ': 'ᚭ', 'ס': 'ᚮ', 'ע': 'ᚯ', 'פ': 'ᚰ',
      'צ': 'ᚱ', 'ק': 'ᚲ', 'ר': 'ᚳ', 'ש': 'ᚴ', 'ת': 'ᚵ',
      'ך': 'ᚶ', 'ם': 'ᚷ', 'ן': 'ᚸ', 'ף': 'ᚹ', 'ץ': 'ᚺ',
      '0': 'ᛢ', '1': 'ᛣ', '2': 'ᛤ', '3': 'ᛥ', '4': 'ᛦ',
      '5': 'ᛧ', '6': 'ᛨ', '7': 'ᛩ', '8': 'ᛪ', '9': '᛫'
    },
    symbols: {
      'א': '⚔', 'ב': '⚡', 'ג': '☠', 'ד': '⚜', 'ה': '⚓', 'ו': '☯', 'ז': '⚝', 'ח': '✴', 'ט': '⚞',
      'י': '⚟', 'כ': '⚠', 'ל': '⚢', 'מ': '⚣', 'נ': '⚤', 'ס': '⚥', 'ע': '⚦', 'פ': '⚧',
      'צ': '⚨', 'ק': '⚩', 'ר': '⚪', 'ש': '⚫', 'ת': '⚬',
      'ך': '⚭', 'ם': '⚮', 'ן': '⚯', 'ף': '⚰', 'ץ': '⚱',
      '0': '✠', '1': '✡', '2': '✢', '3': '✣', '4': '✤',
      '5': '✥', '6': '✦', '7': '✧', '8': '✩', '9': '✪'
    },
    magic: {
      'א': '✡', 'ב': '☮', 'ג': '⚕', 'ד': '☯', 'ה': '☪', 'ו': '☘', 'ז': '⚛', 'ח': '☠', 'ט': '☢',
      'י': '☣', 'כ': '✴', 'ל': '✳', 'מ': '❈', 'נ': '⚝', 'ס': '⚜', 'ע': '☸', 'פ': '⚚',
      'צ': '☥', 'ק': '☦', 'ר': '☧', 'ש': '☨', 'ת': '☩',
      'ך': '☬', 'ם': '☫', 'ן': '☪', 'ף': '☭', 'ץ': '☮',
      '0': '❂', '1': '❃', '2': '❄', '3': '❅', '4': '❆',
      '5': '❇', '6': '❈', '7': '❉', '8': '❊', '9': '❋'
    }
  };

  const englishCiphers: CipherSet = {
    ancient: {
      'A': '𐌀', 'B': '𐌁', 'C': '𐌂', 'D': '𐌃', 'E': '𐌄', 'F': '𐌅', 'G': '𐌆', 'H': '𐌇', 'I': '𐌉',
      'J': '𐌊', 'K': '𐌋', 'L': '𐌌', 'M': '𐌍', 'N': '𐌎', 'O': '𐌏', 'P': '𐌐', 'Q': '𐌑',
      'R': '𐌒', 'S': '𐌓', 'T': '𐌔', 'U': '𐌕', 'V': '𐌖', 'W': '𐌗', 'X': '𐌘', 'Y': '𐌙', 'Z': '𐌚',
      '0': '𐤧', '1': '𐤨', '2': '𐤩', '3': '𐤪', '4': '𐤫',
      '5': '𐤬', '6': '𐤭', '7': '𐤮', '8': '𐤯', '9': '𐤰'
    },
    hieroglyphs: {
      'A': '𓀀', 'B': '𓀁', 'C': '𓀂', 'D': '𓀃', 'E': '𓀄', 'F': '𓀅', 'G': '𓀆', 'H': '𓀇', 'I': '𓀈',
      'J': '𓀉', 'K': '𓀊', 'L': '𓀋', 'M': '𓀌', 'N': '𓀍', 'O': '𓀎', 'P': '𓀏', 'Q': '𓀐',
      'R': '𓀑', 'S': '𓀒', 'T': '𓀓', 'U': '𓀔', 'V': '𓀕', 'W': '𓀖', 'X': '𓀗', 'Y': '𓀘', 'Z': '𓀙',
      '0': '𓅐', '1': '𓅑', '2': '𓅒', '3': '𓅓', '4': '𓅔',
      '5': '𓅕', '6': '𓅖', '7': '𓅗', '8': '𓅘', '9': '𓅙'
    },
    runes: {
      'A': 'ᚨ', 'B': 'ᚩ', 'C': 'ᚪ', 'D': 'ᚫ', 'E': 'ᚬ', 'F': 'ᚭ', 'G': 'ᚮ', 'H': 'ᚯ', 'I': 'ᚰ',
      'J': 'ᚱ', 'K': 'ᚲ', 'L': 'ᚳ', 'M': 'ᚴ', 'N': 'ᚵ', 'O': 'ᚶ', 'P': 'ᚷ', 'Q': 'ᚸ',
      'R': 'ᚹ', 'S': 'ᚺ', 'T': 'ᚻ', 'U': 'ᚼ', 'V': 'ᚽ', 'W': 'ᚾ', 'X': 'ᚿ', 'Y': 'ᛀ', 'Z': 'ᛁ',
      '0': 'ᛢ', '1': 'ᛣ', '2': 'ᛤ', '3': 'ᛥ', '4': 'ᛦ',
      '5': 'ᛧ', '6': 'ᛨ', '7': 'ᛩ', '8': 'ᛪ', '9': '᛫'
    },
    symbols: {
      'A': '⚀', 'B': '⚁', 'C': '⚂', 'D': '⚃', 'E': '⚄', 'F': '⚅', 'G': '⚆', 'H': '⚇', 'I': '⚈',
      'J': '⚉', 'K': '⚊', 'L': '⚋', 'M': '⚌', 'N': '⚍', 'O': '⚎', 'P': '⚏', 'Q': '⚐',
      'R': '⚑', 'S': '⚒', 'T': '⚓', 'U': '⚔', 'V': '⚕', 'W': '⚖', 'X': '⚗', 'Y': '⚘', 'Z': '⚙',
      '0': '✠', '1': '✡', '2': '✢', '3': '✣', '4': '✤',
      '5': '✥', '6': '✦', '7': '✧', '8': '✩', '9': '✪'
    },
    magic: {
      'A': '♈', 'B': '♉', 'C': '♊', 'D': '♋', 'E': '♌', 'F': '♍', 'G': '♎', 'H': '♏', 'I': '♐',
      'J': '♑', 'K': '♒', 'L': '♓', 'M': '⛎', 'N': '☉', 'O': '☊', 'P': '☋', 'Q': '♁',
      'R': '⚷', 'S': '⚴', 'T': '⚵', 'U': '⚶', 'V': '♇', 'W': '♆', 'X': '♅', 'Y': '♄', 'Z': '♃',
      '0': '❂', '1': '❃', '2': '❄', '3': '❅', '4': '❆',
      '5': '❇', '6': '❈', '7': '❉', '8': '❊', '9': '❋'
    }
  };

  const cipherStyles: CipherStyles = {
    ancient: { icon: Scroll, name: language === 'he' ? 'כתב קדום' : 'Ancient Script', bgColor: 'bg-amber-700' },
    hieroglyphs: { icon: Key, name: language === 'he' ? 'הירוגליפים' : 'Hieroglyphs', bgColor: 'bg-yellow-600' },
    runes: { icon: Sword, name: language === 'he' ? 'רונות' : 'Runes', bgColor: 'bg-gray-700' },
    symbols: { icon: Castle, name: language === 'he' ? 'סמלים' : 'Symbols', bgColor: 'bg-purple-700' },
    magic: { icon: Skull, name: language === 'he' ? 'קסם' : 'Magic', bgColor: 'bg-blue-700' }
  };

  const encryptText = (text: string): string => {
    const currentCiphers = language === 'he' ? hebrewCiphers : englishCiphers;

    const words = text.split(/(\s+)/).filter(Boolean);

    if (language === 'he' && (selectedCipher === 'hieroglyphs' || selectedCipher === 'runes')) {
      words.reverse();
    }

    const encryptedWords = words.map(word => {
      if (/^\s+$/.test(word)) return word;

      const isNumber = /^\d+$/.test(word);

      let chars = word.split('');
      
      if (language === 'he' && !isNumber && (selectedCipher === 'hieroglyphs' || selectedCipher === 'runes')) {
        chars = chars.reverse();
      }
      
      return chars.map(char => {
        const upperChar = char.toUpperCase();
        return currentCiphers[selectedCipher][upperChar] || char;
      }).join('');
    });

    return encryptedWords.join('');
  };

  const copyKeyToClipboard = () => {
    const currentCiphers = language === 'he' ? hebrewCiphers[selectedCipher] : englishCiphers[selectedCipher];
    const keyText = Object.entries(currentCiphers)
      .map(([char, cipher]) => `${char} → ${cipher}`)
      .join('\n');
    
    void navigator.clipboard.writeText(keyText);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const downloadKey = () => {
    const currentCiphers = language === 'he' ? hebrewCiphers[selectedCipher] : englishCiphers[selectedCipher];
    const keyText = Object.entries(currentCiphers)
      .map(([char, cipher]) => `${char} → ${cipher}`)
      .join('\n');
    
    const blob = new Blob([keyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cipher-key-${selectedCipher}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'he' ? 'en' : 'he');
    setText('');
  };

  return (
    <div className={`min-h-screen bg-[#191919] text-white p-2 pb-0 font-sans ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <Link to="/" className="text-white hover:text-gray-400 cursor-pointer right-0 absolute top-0 m-4">
        <X size={24} />
      </Link>
      <div className="max-w-4xl mx-auto relative">
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {language === 'he' ? 'המקרא הועתק ללוח' : 'Key copied to clipboard'}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Languages className="w-5 h-5" />
            <span>{language === 'he' ? 'English' : 'עברית'}</span>
          </button>
          <h1 className={`text-4xl font-bold ${language === 'he' ? 'text-right' : 'text-left'}`}>
            {language === 'he' ? 'יוצר כתב הסתרים' : 'Cipher Creator'}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(Object.entries(cipherStyles) as [CipherType, CipherStyle][]).map(([key, { icon: Icon, name, bgColor }]) => (
            <button
              key={key}
              onClick={() => setSelectedCipher(key as CipherType)}
              className={`${bgColor} ${selectedCipher === key ? 'ring-4 ring-white' : ''} 
                p-4 rounded-lg flex flex-col items-center justify-center transition-all
                hover:opacity-90 space-y-2`}
            >
              <Icon className="w-8 h-8" />
              <span>{name}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <label className={`block text-lg mb-2 text-center ${language === 'he' ? 'rtl' : 'ltr'}`}>
              {language === 'he' ? ':הכנס טקסט להצפנה' : 'Enter text to encrypt:'}
            </label>
            <textarea
              tabIndex={0}
              autoFocus={true}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className={`text-xl font-semibold mb-4 text-center ${language === 'he' ? 'rtl' : 'ltr'}`}>
              {language === 'he' ? ':הטקסט המוצפן' : 'Encrypted Text:'}
            </h2>
            <div 
              className="text-2xl break-words font-mono bg-gray-900 p-4 rounded" 
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {encryptText(text)}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className={`flex justify-between items-center mb-4 ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
              <h2 className={`text-xl font-semibold ${language === 'he' ? 'rtl' : 'ltr'}`}>
                {language === 'he' ? ':מקרא הצופן' : 'Cipher Key:'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={copyKeyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{language === 'he' ? 'העתק' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadKey}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'he' ? 'הורד' : 'Download'}</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {Object.entries(language === 'he' ? hebrewCiphers[selectedCipher] : englishCiphers[selectedCipher]).map(([char, cipher]) => (
                <div 
                  key={char} 
                  className="flex items-center justify-center bg-gray-900 p-2 rounded-lg"
                >
                  <span className="font-bold text-lg ml-2">{char}</span>
                  <span className="text-blue-400 mx-2">→</span>
                  <span className="text-2xl">{cipher}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CipherCreator;