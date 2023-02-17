import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ListLoader = ({ rowLength, colLength, hidden = false }) => {
  const rows = Array(rowLength).fill(2);
  const cols = Array(colLength).fill(2);

  return (
    <>
      <div className="mx-auto w-full p-4 shadow">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            {rows.map((i, index) => (
              <div key={index} className=" h-3  rounded bg-slate-200"></div>
            ))}
          </div>
          {/* {rows.map((i, index) => (
              <div key={index}>
                <div className="space-y-3">
                  <div className={`grid grid-cols-${colLength} gap-4`}>
                    {cols.map((col, inx) => (
                      <div
                        key={inx}
                        className="col-span-1 h-2 rounded bg-slate-200 p-1"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))} */}
        </div>
      </div>
    </>
  );
};

export default ListLoader;
