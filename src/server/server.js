const server = function*()
{
  // infinitely generate values
  while ( true )
  {
    yield new Promise( resolve => {
       setTimeout(() => {
         const n = Math.floor(Math.random() * (50 - 21)) + 20;

         /**
          * Create an Array of n length and fill it with some random data
          */
         const dataEntries = Array.apply({}, { length : n }).map(() => {
           return {
             tablet : parseInt( Math.random() * 1000 ),
             smartphone : parseInt( Math.random() * 1000 )
           };
         });

         resolve({ dataEntries } )
         // random server delay
       }, Math.random() * 1000 );
    })
  }
}();

export async function response(){
    const value = await server.next().value;
    return value;
}
