## Инструкция для запуска в dev режиме

1. `npm run install` (устанавливает зависимости)
2. `npm run eject` (создает ios/ и android/)
3. `npm run ios` или `npm run android`

## Troubleshooting

1. `network request failed`
   По умолчанию ios блокирует http запросы (разрешены только https).
   Для решения этой проблемы необходимо добавить разрешение в _Info.plist._


```
  ...
  <key>NSAppTransportSecurity</key>
  <dict>
    ...
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    ...
  </dict>
  ...
```
