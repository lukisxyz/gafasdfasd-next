import { faker } from '@faker-js/faker'

export function generateTableStudentData() {
    const value = {
        id: faker.string.uuid(),
        student_id: faker.string.numeric(8),
        name: faker.person.fullName(),
        gender: faker.person.sex(),
        entry_year: String(faker.date.anytime().getFullYear()),
        address: faker.location.streetAddress(),
    }

    return value
}

export function generateTableStudentDataData(count) {
    return Array.from({ length: count }, () => generateTableStudentData())
}
