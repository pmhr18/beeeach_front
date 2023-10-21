'use client';
import { useEffect, useState } from 'react';

interface SubSection {
  subTitle: string;
  subSections: string[];
}

interface Section {
  sections: any[];
  title: string;
  subSections: SubSection[];
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
      } catch (e) {
        console.error('JSONファイルを取得できませんでした。', e);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col justify-between">
      <article className="prose max-w-none">
        <h1>利用規約</h1>
        <div>
          {terms?.terms.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
                {section.sections.length === 1 ? (
                  <div>
                    <p>{section.sections[0].subTitle}</p>
                    {section.sections[0].subSections.length > 0 && (
                      <ol>
                        {section.sections[0].subSections.map((subSubSection: string, subSubIndex: number) => (
                          <li key={subSubIndex}>{subSubSection}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                ) : (
                  <ol>
                    {section.sections.map((subSection: any, subIndex) => (
                      <div key={subIndex}>
                        <li>{subSection.subTitle}</li>
                        {subSection.subSections.length > 0 && (
                          <ol>
                            {subSection.subSections.map((subSubSection: string, subSubIndex: number) => (
                              <li key={subSubIndex}>{subSubSection}</li>
                            ))}
                          </ol>
                        )}
                      </div>
                    ))}
                  </ol>
                )}
            </div>
          ))}
        </div>
      </article>
      <div className='mt-20 text-right'>以上</div>
      <div className='mt-10'>2024年2月1日　施行</div>
    </main>
  );
}

export default Terms;

