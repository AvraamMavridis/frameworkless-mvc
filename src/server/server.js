const server = function*()
{
  // infinitely generate values
  while ( true )
  {
    yield new Promise( resolve => {
       setTimeout(() => {
         const tablet = Math.random().toFixed(2) * 100;
         const smartphone = 100 - tablet;
         resolve({ tablet, smartphone } )
       }, Math.random() * 1000 );
    })
  }
}();

export async function response(){
  const value = await server.next().value;
  return value;
}
