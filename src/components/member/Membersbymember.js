import React, { useContext, useEffect } from 'react';
import Membercard from './Membercard';
import memContext from '../../context/memContext';
import Layout from '../Layout';

const Membersbymember = () => {
  const context = useContext(memContext);
  const { mem, getMemm } = context;

  useEffect(() => {
    
    getMemm();
  }, []);

  return (
    <div>
      <Layout title={"Members-Turiyam Lifestyles"}>
        <div className="row my-3">
          <div className="container mx-2"> 
            {mem && mem.length > 0 ? (
              <div className="row row-cols-md-3 row-cols-1">
                {mem.map((p) => (
                  <Membercard key={mem._id} mems={p} />
                ))}
              </div>
            ) : (
              <div className="container text-center">
                <p>You are not logged in.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Membersbymember;
