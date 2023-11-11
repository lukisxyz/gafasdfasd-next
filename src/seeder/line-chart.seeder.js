import { faker } from '@faker-js/faker'

export function generateRandomLineChart() {
    const title = faker.lorem.words(2)
    const value = Array.from(
        { length: faker.datatype.number({ min: 10, max: 20 }) },
        () => ({
            label: faker.lorem.word(),
            value: faker.datatype.number({ min: 20, max: 40 }),
        }),
    )

    return { title, value }
}

export function generateRandomSummaryLineChart(count) {
    return Array.from({ length: count }, () => generateRandomLineChart())
}
