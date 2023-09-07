type TypPlatby2 = 'kreditkou' | 'paypal';
type Majitel2 = any;
// fakes
declare var KreditniBrana: any;
declare var PayPalAPI: any;
declare var PayPalAPIKey: any;


interface Platba {
  CheckBalance(majitel: Majitel, castka: number): boolean;
  Pay(majitel: Majitel, castka: number): string;
  CheckPayment(payment: string): boolean;
}

class KreditniPlatba implements Platba {
  CheckBalance(majitel: Majitel, castka: number): boolean {
    return  KreditniBrana.OveritStavKonta(majitel, castka);
  }
  Pay(majitel: Majitel, castka: number): string {
    return KreditniBrana.Zaplatit(majitel, castka);
  }
  CheckPayment(payment: string): boolean {
    return KreditniBrana.OveritPlatbu(payment);
  }
} 

class PaypalPlatba implements Platba {
  CheckBalance(majitel: Majitel, castka: number): boolean {
    return  PayPalAPI.CheckAccount(PayPalAPIKey, majitel, castka);
  }
  Pay(majitel: Majitel, castka: number): string {
    return  PayPalAPI.Pay(PayPalAPIKey, majitel, castka);
  }
  CheckPayment(payment: string): boolean {
    return PayPalAPI.Pay(PayPalAPIKey, payment);
  }
} 

const typPlatbyStrategyMap: Record<TypPlatby2, Platba> = {
  kreditkou: new KreditniPlatba(),
  paypal: new PaypalPlatba()
}

function resolveStrategy(typPlatby: TypPlatby2) {
   return typPlatbyStrategyMap[typPlatby];
}

function zaplat2(typPlatby: TypPlatby, castka: number, majitel: Majitel) {
  // zjistit, zda je mozne zaplatit
  let stavOk = false;
  const impl = resolveStrategy(typPlatby);
  stavOk = impl.CheckBalance(majitel, castka);
  if (!stavOk) throw Error("Není dostatek financí!");
  let platba = null;
  // Zaplatit
  platba = impl.Pay(majitel, castka);
  // Ověřit
  stavOk = impl.CheckPayment(platba);
  if (!stavOk) throw Error("Platba se nepovedla!");
}