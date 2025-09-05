# 📚 리액트 컴포넌트 컨벤션 (React Component Convention)

## ✍️ 컴포넌트 네이밍 규칙

### 1. 일반 컴포넌트 네이밍 규칙

- 모든 리액트 컴포넌트 이름은 **PascalCase** 를 사용해요
- 기본적으로 일반적인 컴포넌트는 ES6 Arrow Function 을 사용해요
    - 단, 페이지 컴포넌트에 한해서는 예외가 있어요. 아래 `3. 페이지 컴포넌트` 섹션을 참고해주세요

```ts
// 올바른 예시
export const MyComponent = () => {};

// 잘못된 예시
export const myComponent = () => {};
export function myComponent() {};
```

<br/>

### 2. Props 타입 네이밍 규칙

- TypeScript `interface` 를 사용하여 컴포넌트의 Props 에 대한 타입을 지정해요
- Props 에 대한 타입은 `컴포넌트이름Props` 로 지정해요
    - 따로 `React.FC` 를 사용하지 않고 props 를 구조분해할당한 후 props 매개변수 뒤에 타입을 지정하도록 해요

```ts
// 올바른 예시
export interface MyComponentProps {}
export const MyComponent = ({} : MyComponentProps) => {}

// 잘못된 예시
export type MyComponentProps = {} // type 대신 interface 를 사용해요
export const MyComponent : React.FC<MyComponentProps> = ({}) => {}
```

<br/>

### 3. 페이지 컴포넌트

- 페이지 컴포넌트는 함수 선언문 `function` 으로 선언해요
- 일반 컴포넌트와는 다르게 `export default function` 으로 내보내서 사용해요

```TypeScript
// 올바른 예시
export default function MyPage() {}
```

> [!NOTE]
>
> #### 왜 페이지 컴포넌트를 `export default function`으로 내보내나요? <br/>
>
> 페이지 단위로 코드 분할(Code Splitting) 및 지연 로딩(Lazy Loading)을 적용하는 경우가 많아요 <br/>
> 이때 `import('./MyPage').then((mod) => mod.MyPage)` 와 같이 길어지는 Named Export 방식과 달리, <br/>
> default export는 `import('./MyPage')` 만으로 모듈을 불러올 수 있어 더 간결하게 코드를 작성할 수 있어요

<br/>

### 4. 컴포넌트 파일 구조

- 각 컴포넌트는 별도의 디렉터리를 가져요
- 예를들어 MyComponent 디렉터리 내에 `index.ts` (배럴 파일), `MyComponent.stories.tsx`, `MyComponent.tsx` 를 기본 형태로 구성되어 있어요
    - `index.ts` 파일은 해당 디렉터리의 컴포넌트를 외부로 노출하는 배럴 파일 역할을 해요
    - `MyComponent.stories.tsx`는 컴포넌트의 스토리북(Storybook) 파일을 위한 파일이에요
    - `MyComponent.tsx`는 실제 컴포넌트 코드를 담고 있는 파일이에요

> [!TIP]
> Repository 를 클론하면 `.vscode/workspace.code-snippets` 에 스토리북 코드 스니펫이 정의되어 있어요 <br/>
> `!sb` 또는 `!storybook` 을 입력하면 스토리북을 작성할때 필요한 기본적인 스켈레톤 코드를 작성해줘요

> [!TIP]
>
> #### 관련 컴포넌트 응집도 높이기!
>
> 해당 디렉토리 이름과 관련된 컴포넌트는 해당 디렉토리에 함께 저장해요 <br/>
> 예를 들어 `NavTop`, `NavTopItem`, `NavTopMenu` 등과 같이 서로 밀접하게 관련된 컴포넌트들은 하나의 디렉터리 안에 두어 응집도(Cohesion)를 높입니다

<br/>
<br/>

# 📚 API 및 데이터 관리

## ✍️ API 연결 및 네이밍 규칙

- API 연결 라이브러리는 `axios`와 `react-query`를 사용해요
- 기본적으로 FSD(Feature Sliced Design) 아키텍쳐를 사용하여 디렉토리 구조를 구성한 경우 `service` 세그먼트 내에 파일을 위치시켜요

### 1. API 요청 및 응답 타입

- 요청 및 응답 데이터의 타입은 **export interface**를 사용하여 정의해요
- 접미사(postfix)에 `ResponseBody` 또는 `RequestBody` 를 붙여 명확하게 구분합니다

```ts
export interface GetProfileByProfileIdResponseBody {
    name: string;
    email: string;
}
```

<br/>

### 2. API 요청 함수

- API 요청 함수는 **export async function**으로 선언해요
    - 접두사(prefix)에 get, create, edit, delete, signup 등 동작을 명확히 나타내는 동사를 붙입니다.
    - 접미사(postfix)에 **By**와 함께 무엇을 기준으로 데이터를 가져오는지 명시할 수 있어요

```ts
export async function getProfileById(id: number) {
    const { data: response } = await api.get<BaseResponse<GetProfileByProfileIdResponseBody>>(
        `/profile/${id}`,
    );
    return response.data;
}
```

> [!NOTE]
>
> #### 왜 함수 표현식(`export const func = async () => {}`)이 아닌가요?
>
> 함수 선언부인 export async function에서 async 키워드가 명확하게 드러나기 때문에, <br/>
> 해당 함수가 비동기 함수임을 한눈에 파악할 수 있어요. 이는 코드의 가독성을 높이는 데 도움이 됩니다.

<br/>

### 3. 파일 내 응집도 높이기

- API 요청 함수, 관련 타입(요청/응답), useQuery 또는 useMutation을 감싼 쿼리 훅을 동일한 파일에 함께 둡니다
- 해당 파일 이름은 `createProfileById.ts` 와 같이 **camelCase** 를 사용해서 네이밍 해요

```ts
export interface CreateProfileByIdRequestBody {}
export interface CreateProfileByIdResponseBody {}

export async function createProfileById(id: number) {}

export const useCreateProfile = (id: number) => {
    return useMutation({
        mutationFn: () => createProfileById(id),
    });
};
```

> [!NOTE]
>
> #### 왜 API 관련 요소를 한 파일에 묶나요? (feat. 클린 아키텍처)
>
> 이는 공통 폐쇄 원칙(Common Closure Principle)을 따르는 것입니다. <br/>
> API 명세가 변경될 때, 변경되는 모든 관련 코드(요청 함수, 타입, 쿼리 훅 등)가 한 곳에 묶여 있어 수정이 용이하고, 버그 발생 가능성을 줄일 수 있습니다.

<br/>

### 4. Query Key 관리하기

- `react-query` 를 사용할때, 쿼리 무효화 등을 위해 쿼리키를 사용해요
    - 쿼리키는 `service/_keys.ts` 파일에 정의해요
- 쿼리키는 객체 리터럴을 사용해 해당 Slice (Feature Sliced Design 참고) 와 관련된 쿼리키를 묶어요
- 해당 쿼리키가 `id` 와 같은 의존성이 없더라도 화살표 함수를 사용해 네이밍 규칙을 통일해요

```ts
export const UserQueryKeys = {
    GET_USERNAME: () => ["USER", "GET_USERNAME"],
    GET_PROFILE_BY_ID: (id: number) => ["USER", "GET_PROFILE_BY_ID", id],
} as const;
```

<br/>
<br/>

# 📚 기타 네이밍 규칙

## ✍️ Zod 및 타입 정의

- 유효성 검증을 위해 `zod` 와 `react-hook-form` 을 사용하고 있어요
- Zod 스키마는 접미사로 `Schema` 를 붙입니다
- Zod 스키마를 기반으로 생성된 타입 (`z.infer`) 은 접미사로 `SchemaType`를 붙입니다.

```ts
export const SignUpSchema = z.object({ ... });
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
```

## ✍️ 위젯(Widget) 컴포넌트

- 재사용성이 낮은 위젯 컴포넌트에는 접미사로 `Widget`을 붙여 구분해요 (Feature Sliced Design 위젯 레이어 참고)
