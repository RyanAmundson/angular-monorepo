import { NgxTimelineEvent, NgxTimelineItemPosition } from '@frxjs/ngx-timeline';

export const MOCK_TIMELINE_EVENTS: NgxTimelineEvent[] = [
    {
        id: 1,
        timestamp: new Date('2024-03-20'),
        title: 'Project Kickoff',
        description: 'Initial project planning and team assembly completed',
        itemPosition: NgxTimelineItemPosition.ON_LEFT
    },
    {
        id: 2,
        timestamp: new Date('2024-03-22'),
        title: 'Requirements Gathering',
        description: 'Stakeholder interviews and requirement documentation finished',
        itemPosition: NgxTimelineItemPosition.ON_LEFT
    },
    {
        id: 3,
        timestamp: new Date('2024-03-25'),
        title: 'Design Phase',
        description: 'UI/UX design mockups and architecture planning started',
        itemPosition: NgxTimelineItemPosition.ON_LEFT
    },
    {
        id: 4,
        timestamp: new Date(),
        title: 'Development Sprint 1',
        description: 'Core features implementation in progress',
        itemPosition: NgxTimelineItemPosition.ON_LEFT
    }
]; 