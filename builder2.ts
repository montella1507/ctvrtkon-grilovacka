class Attendee2 {
  private constructor(private email: string, private type: 'required' | 'optional'){}
  static required(email: string) {
    return new Attendee2(email, 'required');
  }
  static optional(email: string) {
    return new Attendee2(email, 'optional');
  }
}

 var optionalAttendee = Attendee2.optional("optional@seznam.cz");
 var requiredAttendee = Attendee2.required("required@seznam.cz");


class Body2 {
  private constructor(private type: 'text' | 'html', private content: string){}
  static html(content: string) {
    return new Body2('html', content);
  }
  static text(content: string) {
    return new Body2('text', content);
  }
}

var htmlContent = Body2.html("<b>ahoj</b>");
var textContent = Body2.text("Ahoj");


 

class CalendarEvent2 {
  subject: string;
  date: Date;
  attendees: Attendee2[] = [];
  body: Body2;
  isOnlineMeeting: boolean = false;
}

class Attendee2Builder {
  constructor(private _calendarEvent: CalendarEvent2){}
  
  static create(subject: string, date: Date) {
    var event = new CalendarEvent2();
    event.subject = subject;
    event.date = date;
    return new Attendee2Builder(event);
  }
  withBody(body: Body2) {
    this._calendarEvent.body = body;
    return this;
  }
  withAttendee(attendee: Attendee2) {
    this._calendarEvent.attendees.push(attendee);
    return this;
  }
  withAttendees(attendees: Attendee2[]) {
    this._calendarEvent.attendees.push(...attendees);
    return this;
  }
  build(): CalendarEvent2 {
    return this._calendarEvent;
  }
}

var event3 = Attendee2Builder.create("Subject", new Date())
                            .withAttendee(Attendee2.optional("pepa@zdepa.cz"))
                            .withBody(Body2.html("<big>litte</big>"))
                            .build();


console.log(event3);