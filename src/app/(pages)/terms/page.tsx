'use client';
import { useEffect, useState } from 'react';

interface Section {
  title: string;
  content: (string | string[] | Section)[];
}

interface TermsData {
  terms: Section[];
}

function Terms() {
  const [terms, setTerms] = useState<TermsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/terms.json');
        const jsonData = await response.json();
        setTerms(jsonData);
        console.log(terms);
      } catch (e) {
        console.error('JSONファイルを取得できませんでした。', e);
      }
    };
    fetchData();
  }, []);

  const renderContent = (content: (string | string[] | Section)[]) => {
    return content.map((item, index) => (
      <div key={index}>
        {typeof item === 'string' ? (
          <p>{item}</p>
        ) : Array.isArray(item) ? (
          item.length === 1 ? (
            <p>{item[0]}</p>
          ) : (
            <ol>
              {item.map((subItem, subIndex) => (
                <li key={subIndex}>{subItem}</li>
              ))}
            </ol>
          )
        ) : (
          <>
            <h4>{item.title}</h4>
            {renderContent(item.content)}
          </>
        )}
      </div>
    ));
  };

  return (
    <main className="flex flex-col justify-between">
      <article className="prose max-w-none">
        <h1>利用規約</h1>
        {terms ? (
          <div>
            {terms.terms.map((section, index) => (
              <div key={index}>
                <h3>{section.title}</h3>
                {renderContent(section.content)}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </article>
    </main>
  );
}

export default Terms;