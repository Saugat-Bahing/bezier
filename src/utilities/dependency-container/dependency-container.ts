export class DependencyContainer {
    private static registry: Map<string, object> = new Map();

    static registerDependency(key: string, instance: any) {
        if (!DependencyContainer.registry.has(key)) {
            DependencyContainer.registry.set(key, instance);
            console.log(`Added ${key} to the registry`);
        }
    }

    static get(key: string) {
        if (!DependencyContainer.registry.has(key)) {
            throw `${key} is not registered to the Dependency registry.`;
        }
        return DependencyContainer.registry.get(key);
    }
}

interface Injection {
    index: number;
    key: string;
}

export function injectionTarget() {
    return function injectionTarget<T extends { new (...args: any[]): {} }>(constructor: T): T | void {
        return class extends constructor {
            constructor(...args: any[]) {
                const injections = (constructor as any).injections as Injection[];
                const injectedArgs: any[] = injections.map(({ key }) => {
                    return DependencyContainer.get(key);
                });
                super(...injectedArgs);
            }
        };
    };
}

export function inject(key: string) {
    return function (target: Object, propertyKey: string | symbol, paramerterIndex: number) {
        console.log(target, propertyKey, paramerterIndex, key);
        const injection: Injection = { index: paramerterIndex, key };
        const existingInjections: Injection[] = (target as any).injections || [];
        Object.defineProperty(target, "injections", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: [...existingInjections, injection],
        });
    };
}
