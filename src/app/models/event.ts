export class Event {
  constructor(
            public id: string,
            public name: string,
            public start_date: string,
            public description: string,
            public days_duration: string,
            public hours_day: string,
            public start_hour: string,
            public event_city_id: string,
            public event_province_id: string,
            public event_country_id: string,
            public event_place: string,
            public include_nearby_places: string,
            public number_of_attendees: string,
            public number_of_rooms: string,
            public assistant_activities_id: string,
            public include_logo: string,
            public include_slide: string,
            public include_screen: string,
            public include_banners: string,
            public include_flyers: string,
            public send_invitations_by_mail: string,
            public analitycs_segment_audience: string,
            public analitycs_inbound_marketing: string,
            public analitycs_analyze_scenarios: string,
            public analitycs_incident_monitoring: string,
            public analitycs_analyze_results: string,
            public status_id: string,
            public user_id: string

  ){}
}
