class Attendee {
  email: string;
  type: 'required' | 'optional';
}

class Body {
  type: 'text' | 'html';
  content: string;
}

class CalendarEvent {
  subject: string;
  date: Date;
  attendees: Attendee[];
  body: Body;
  isOnlineMeeting: boolean;

  constructor(subject, date, body, isOnlineMeeting,  attendees) {
    this.subject = subject;
    this.date = date;
    this.body = body;
    this.attendees = attendees;
    this.isOnlineMeeting = isOnlineMeeting;
  }
}

var attendee = new Attendee();
attendee.type = "required";
attendee.email = "marian.bencat@live.com";

var body = new Body();
body.type = "html";
body.content = "<b> ahoj </b>";

var calendarEvent1 = new CalendarEvent(
  "subject",
  new Date(),
  body,
  false,
  [attendee]
);

