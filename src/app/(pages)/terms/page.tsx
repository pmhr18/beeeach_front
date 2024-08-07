'use client';
import { useEffect, useState } from 'react';

interface GrandChildSection {
  grandChildTitle: string;
  grandChildSections: string[];
}

interface ChildSection {
  childSections: any[];
  childTitle: string;
  grandChildSections: GrandChildSection[];
}

interface Section {
  sections: any[];
  title: string;
  childSections: ChildSection[];
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
        <p className='mt-10 mb-16'>この利用規約（以下，「本規約」といいます。）は，beeeach運営者（以下，「運営者」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。</p>
        <div>
          {terms?.terms.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
            
                {section.sections.length === 1 ? (
                  <div>
                    <p>{section.sections[0].childTitle}</p>
                    {section.sections[0].childSections.length > 0 && (
                    
                      <ol>
                      {section.sections[0].childSections.map((grandChildSection: any, grandChildIndex: number) => (
                        <div key={grandChildIndex}>
                          <li>{grandChildSection.grandChildTitle}</li>
                          {grandChildSection.grandChildSections.length > 0 && (
                          
                          <ol className='list-roman'>
                          {grandChildSection.grandChildSection[0].grandChildSections.map((descendantGrandChildSection: string, descendantChildIndex: number) => (
                            <li key={descendantChildIndex}>{descendantGrandChildSection}</li>
                            ))}
                          </ol>
  
                        )}
                        </div>
                        ))}
                      </ol>
  
                    )}
                  </div>
  
                ) : (
                  <ol>
                  {section.sections.map((childSection: any, childIndex) => (
                    <div key={childIndex}>
                      <li>{childSection.childTitle}</li>
                      {childSection.childSections.length > 0 && (
                      
                        <ol>
                        {childSection.childSections.map((grandChildSection: any, grandChildIndex: number) => (
                          <div key={grandChildIndex}>
                            <li>{grandChildSection.grandChildTitle}</li>
                            {grandChildSection.grandChildSections.length > 0 && (
                            
                            <ol className='list-roman'>
                            {grandChildSection.grandChildSections.map((descendantGrandChildSection: string, descendantChildIndex: number) => (
                              <li key={descendantChildIndex}>{descendantGrandChildSection}</li>
                              ))}
                            </ol>
  
                          )}
                          </div>
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

