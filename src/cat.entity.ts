import {CreateCatRequestDto} from "./dto/create-cat.request-dto";
import {CatStatus} from "./cat-status";
import {GetCatVitalPropertiesResponseDto} from "./dto/get-cat-vital-properties.response-dto";

export class CatEntity {
    // region Fields

    private static instance: CatEntity;
    private static internalId: NodeJS.Timeout | null = null;

    // Показатели кота
    private name: string;
    private age: number = 0;
    private health: number = 100;
    private hungry: number = 0;
    private mood: number;
    private status: CatStatus = CatStatus.alive;

    // endregion

    private constructor(data: CreateCatRequestDto) {
        Object.assign(this, data);
        this.mood = (this.health + (100 - this.hungry)) / 2;

        this.startRefreshingVitalProperties();
    }


    static create(data: CreateCatRequestDto) {
        if (this.internalId) {
            clearInterval(this.internalId);
            this.internalId = null;
        }
        this.instance = new CatEntity(data);
    }

    static isInstance(): boolean {
        return !!this.instance;
    }

    static getInstance(): CatEntity {
        if (!this.isInstance()) {
            throw new Error("Кота еще на завели.");
        }
        return this.instance;
    }

    private updateStatus(): CatStatus {
        if (this.health <= 0 || this.hungry >= 100) {
            this.status = CatStatus.dead;
        } else if (this.health <= 30 && this.health > 0) {
            this.status = CatStatus.sick;
        } else {
            this.status = CatStatus.alive;
        }
        return this.status;
    }

    private updateStatusAndHandleDeath(): void {
        const status = this.updateStatus();

        if (status === CatStatus.dead && CatEntity.internalId) {
            clearInterval(CatEntity.internalId);
            CatEntity.internalId = null;
        }
    }

    private calculateMood(): number {
        return (this.health + (100 - this.hungry)) / 2;
    }

    private refreshVitalProperties(): void {
        this.age += 1;

        const healthDecrease = this.hungry > 70 ? 5 : 2;
        this.health = Math.max(0, this.health - healthDecrease)
        this.hungry = Math.min(100, this.hungry + 3);
        this.mood = this.calculateMood();
        this.updateStatusAndHandleDeath();
    }

    private startRefreshingVitalProperties(): void {
        CatEntity.internalId = setInterval(() => this.refreshVitalProperties(), 60000);
    }

    // region Public methods

    public toFeed(): void {
        if (this.status === CatStatus.dead) {
            throw new Error('К сожалению, кот умер')
        }

        this.hungry = Math.max(0, this.hungry - 30);
        this.mood = Math.max(100, this.mood + 10);
        this.updateStatusAndHandleDeath();
    }

    public toHeal(): void {
        if (this.status === CatStatus.dead) {
            throw new Error('К сожалению, кот умер')
        }

        this.health = Math.min(100, this.health + 20)
        this.hungry = Math.max(0, this.hungry - 10);
        this.mood = this.calculateMood();
        this.updateStatusAndHandleDeath();
    }

    public toPlay(): void {
        if (this.status === CatStatus.dead) {
            throw new Error('К сожалению, кот умер')
        }

        this.mood = Math.min(100, this.mood + 15);
        this.hungry = Math.min(100, this.hungry + 5);
        this.updateStatusAndHandleDeath();
    }

    public getVitalProperties(): GetCatVitalPropertiesResponseDto {
        return {
            name: this.name,
            hungry: this.hungry,
            health: this.health,
            mood: this.mood,
            status: this.status,
            age: this.age
        } as GetCatVitalPropertiesResponseDto;
    }

    // endregion
}