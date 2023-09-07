type TypPlatby = 'kreditkou' | 'paypal';

type Majitel = any;
// fakes
declare var KreditniBrana: any;
declare var PayPalAPI: any;
declare var PayPalAPIKey: any;

function zaplat(typPlatby: TypPlatby, castka: number, majitel: Majitel) {
  // zjistit, zda je mozne zaplatit
  let stavOk = false;

  if (typPlatby == 'kreditkou') {
    stavOk = KreditniBrana.OveritStavKonta(majitel, castka);
  }
  if (typPlatby == 'paypal') {
    stavOk = PayPalAPI.CheckAccount(PayPalAPIKey, majitel, castka);
  }

  if (!stavOk) throw Error("Není dostatek financí!");

  let platba = null;
  // Zaplatit
  if (typPlatby == 'kreditkou') {
    platba = KreditniBrana.Zaplatit(majitel, castka);
  }
  if (typPlatby == 'paypal') {
    platba = PayPalAPI.Pay(PayPalAPIKey, majitel, castka);
  }

  // Ověřit
  if (typPlatby == 'kreditkou') {
    stavOk = KreditniBrana.OveritPlatbu(platba);
  }
  if (typPlatby == 'paypal') {
    stavOk = PayPalAPI.Pay(PayPalAPIKey, platba);
  }

  if (!stavOk) throw Error("Platba se nepovedla!");
}