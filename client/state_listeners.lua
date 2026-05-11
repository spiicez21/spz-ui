-- spz-ui/client/state_listeners.lua

local function GetPlayerFromBag(bagName)
  return tonumber(bagName:match("player:(%d+)"))
end

-- ── Race State ─────────────────────────────────────────────────────────────
AddStateBagChangeHandler("inRace", nil, function(bagName, key, value, _, replicated)
  local source = GetPlayerFromBag(bagName)
  if source ~= GetPlayerServerId(PlayerId()) then return end

  if value then
    -- Trigger UI enter race
    TriggerEvent("spz-ui:enterRace")
    SendNUIMessage({ action = "ui:enterRace" })
  else
    -- Trigger UI exit race
    TriggerEvent("spz-ui:exitRace")
    SendNUIMessage({ action = "ui:exitRace" })
  end
end)

-- ── Queue State ────────────────────────────────────────────────────────────
AddStateBagChangeHandler("inQueue", nil, function(bagName, key, value)
  local source = GetPlayerFromBag(bagName)
  if source ~= GetPlayerServerId(PlayerId()) then return end

  SendNUIMessage({
    action = "queue:update",
    data = {
      inQueue       = value,
      queueClass    = Player(source).state.queueClass,
      queuePosition = Player(source).state.queuePosition,
    }
  })
end)

-- ── Position Update ────────────────────────────────────────────────────────
AddStateBagChangeHandler("racePosition", nil, function(bagName, key, value)
  local source = GetPlayerFromBag(bagName)
  if source ~= GetPlayerServerId(PlayerId()) then return end

  SendNUIMessage({
    action = "overlay:update",
    data = {
      position = value,
      lap      = Player(source).state.raceLap,
      time     = Player(source).state.raceTime,
    }
  })
end)

-- ── First-Time Setup ───────────────────────────────────────────────────────
AddStateBagChangeHandler("firstTime", nil, function(bagName, key, value)
  local source = GetPlayerFromBag(bagName)
  if source ~= GetPlayerServerId(PlayerId()) then return end
  if not value then return end

  -- Ensure loading screen is gone so we can see the UI
  ShutdownLoadingScreen()
  ShutdownLoadingScreenNui()
  DoScreenFadeIn(500)

  -- Open character creation
  TriggerEvent("SPZ:openCharacterCreation")
end)

-- ── Identity Ready ─────────────────────────────────────────────────────────
AddStateBagChangeHandler("identityReady", nil, function(bagName, key, value)
  if not value then return end
  local source = GetPlayerFromBag(bagName)
  if source ~= GetPlayerServerId(PlayerId()) then return end

  -- Auto-open vehicle spawner if not first-time
  if not Player(source).state.firstTime then
    Citizen.SetTimeout(800, function()
      ExecuteCommand("spz_spawner")
    end)
  end
end)
