import React from 'react'
import SubjectTable from './table'

export default function page() {

    const data = [
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1201', name: 'ภาษาอังกฤษในชีวิตจริง', hoursPerWeek: 1 },
        { subjectId: '20000-1401', name: 'คณิตศาสตร์พื้นฐานอาชีพ', hoursPerWeek: 1 },
        { subjectId: '20000-1501', name: 'หน้าที่พลเมืองและศีลธรรม', hoursPerWeek: 1 },
        { subjectId: '20001-2001', name: 'คอมพิวเตอร์และสารสนเทศเพื่องานอาชีพ', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
        { subjectId: '20000-1101', name: 'ภาษาไทยพื้นฐาน', hoursPerWeek: 1 },
    ]

    return (
        <div>
            <SubjectTable data={data} />
        </div>
    )
}
